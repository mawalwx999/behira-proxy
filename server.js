const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/proxy-result/:seatNumber', async (req, res) => {
  const seatNumber = req.params.seatNumber;

  if (!/^\d+$/.test(seatNumber)) {
    return res.status(400).json({ error: 'رقم جلوس غير صحيح' });
  }

  try {
    const response = await fetch(`https://natega.behira.gov.eg/api/results/${seatNumber}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: 'النتيجة غير متاحة' });
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء الاتصال بالسيرفر' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
