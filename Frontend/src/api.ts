export async function analyzeLeaf(file: File, model: string) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("model", model);

  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    body: formData
  });

  return res.json();
}
