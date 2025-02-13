from flask import Flask, request, jsonify
import numpy as np
import onnxruntime as ort
from sentence_transformers import util
from transformers import AutoModel, AutoTokenizer

app = Flask(__name__)


onnx_model_path = "mpnet_embeddings.onnx"
ort_session = ort.InferenceSession(onnx_model_path)


model_name = "sentence-transformers/all-mpnet-base-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)

def get_onnx_embeddings(text_list):
    tokens = tokenizer(text_list, padding=True, truncation=True, max_length=128, return_tensors="np")
    input_ids = tokens["input_ids"].astype(np.int64)
    attention_mask = tokens["attention_mask"].astype(np.int64)
    outputs = ort_session.run(None, {"input_ids": input_ids, "attention_mask": attention_mask})
    return outputs[0][:, 0, :]

def calculate_score(student_answer, key_points):
    student_sentences = student_answer.split("\n") 
    student_sentences = [s.strip() for s in student_sentences if s.strip()]

    total_score = 0
    max_score = 0
    threshold = 0.54

    for point, (ideal_answer, weight) in key_points.items():
        ideal_embedding = get_onnx_embeddings([ideal_answer])
        best_similarity = 0  

        for sentence in student_sentences:
            student_embedding = get_onnx_embeddings([sentence])
            similarity = util.pytorch_cos_sim(student_embedding, ideal_embedding).item()
            best_similarity = max(best_similarity, similarity)

        if best_similarity > threshold:
            total_score += weight
        max_score += weight
    
    return {"score": total_score, "max_score": max_score, "result": f"{total_score}/{max_score}"}

@app.route("/grade", methods=["POST"])
def grade_answer():
    data = request.get_json()
    answer_key = data.get("answer_key", {})
    student_answer = data.get("student_answer", "")

    if not answer_key or not student_answer:
        return jsonify({"error": "Both 'answer_key' and 'student_answer' are required"}), 400

    result = calculate_score(student_answer, answer_key)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
