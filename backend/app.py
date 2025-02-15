from flask import Flask, request, jsonify
import numpy as np
import onnxruntime as ort
from sentence_transformers import util
from transformers import AutoTokenizer

app = Flask(__name__)

# Load ONNX model
onnx_model_path = "mpnet_embeddings.onnx"
ort_session = ort.InferenceSession(onnx_model_path)

# Load tokenizer
model_name = "sentence-transformers/all-mpnet-base-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)

def get_onnx_embeddings(text_list):
    tokens = tokenizer(text_list, padding=True, truncation=True, max_length=128, return_tensors="np")
    input_ids = tokens["input_ids"].astype(np.int64)
    attention_mask = tokens["attention_mask"].astype(np.int64)
    outputs = ort_session.run(None, {"input_ids": input_ids, "attention_mask": attention_mask})
    return outputs[0][:, 0, :]

def calculate_score(student_answer, key_points):
    # Use the raw student_answer string
    student_answer = student_answer.strip().replace("\n", " ")
    student_sentences = student_answer.split(".")
    student_sentences = [s.strip() for s in student_sentences if s.strip()]

    breakdown = {}
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

        print(f"Key Point: {point}")
        print(f"Ideal Answer: {ideal_answer}")
        print(f"Best Similarity Score: {best_similarity:.2f}\n")

        if best_similarity > threshold:
            total_score += weight
            breakdown[point] = weight
        else:
            breakdown[point] = 0

        max_score += weight

    score = f"{total_score}/{max_score}"
    return {"breakdown": breakdown, "score": score}

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
