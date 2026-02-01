const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const downloadBtn = document.getElementById("downloadBtn");
const rateVal = document.getElementById("rateVal");
const pitchVal = document.getElementById("pitchVal");

rate.oninput = ()=> rateVal.textContent = rate.value;
pitch.oninput = ()=> pitchVal.textContent = pitch.value;

downloadBtn.onclick = async () => {
  if (!textInput.value.trim()) {
    alert("Please enter text!");
    return;
  }

  const res = await fetch("http://localhost:3000/tts", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      text: textInput.value,
      voice: voiceSelect.value,
      rate: rate.value,
      pitch: pitch.value
    })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "EchoLabPro.mp3";
  a.click();
};
