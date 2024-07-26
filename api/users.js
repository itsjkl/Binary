javascriptCopylet users = {};

function cleanupExpiredUsers() {
  const now = Date.now();
  for (const [username, lastSeen] of Object.entries(users)) {
    if (now - lastSeen > 10000) {
      delete users[username];
    }
  }
}

export default async function handler(req, res) {
  cleanupExpiredUsers();

  if (req.method === 'POST') {
    const { username } = req.body;
    users[username] = Date.now();
    res.status(200).json({ message: 'User updated' });
  } else if (req.method === 'GET') {
    res.status(200).json(Object.keys(users));
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
