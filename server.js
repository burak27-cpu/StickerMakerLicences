const express = require('express');
const app = express();
app.use(express.json());

const licenses = {
  "ABC123": {
    deviceId: "device-unique-id-1",
    valid: true
  }
};

app.post('/verify-license', (req, res) => {
  const { licenseKey, deviceId } = req.body;
  const license = licenses[licenseKey];

  if (license && license.valid && license.deviceId === deviceId) {
    res.json({ success: true, message: "Lisans doğrulandı." });
  } else if (license && license.valid) {
    res.json({ success: false, message: "Lisans bu cihazda kayıtlı değil." });
  } else {
    res.json({ success: false, message: "Lisans geçersiz veya bulunamadı." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor port: ${PORT}`);
});
