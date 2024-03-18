const fetch = require('node-fetch'); // You may need to install node-fetch if using Vercel's Node.js environment

module.exports = async (req, res) => {
  const memberID = req.query.memberID;
  const apiToken = process.env.c3c0350d1f30f13f0f384ad59d549b73046ae087ef1f5f893a68e127ff3bb4b0;
  const collectionId = process.env.65cf741cd15ccc5b10c31fd6;
  
  const apiUrl = `https://api.webflow.com/collections/${collectionId}/items`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept-Version': '1.0.0'
      }
    });
    const data = await response.json();
    const items = data.items.filter(item => item.fields.memberStackId === memberID); // Adjust based on your actual field names
    
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};
