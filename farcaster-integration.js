// Farcaster integration helper (optional).
// This file does NOT post to Farcaster by itself — posting requires user auth and a signing step.
// It listens for 'gameOver' events and provides copy/post helpers.
const loginBtn = document.getElementById('btn-login');
const postBtn = document.getElementById('btn-post');
const shareBtn = document.getElementById('btn-share');

let lastScore = 0;

window.addEventListener('gameOver', (e) => {
  const { score, best } = e.detail || {};
  lastScore = score || 0;
  if (shareBtn) shareBtn.disabled = false;
  if (postBtn) postBtn.disabled = false;
});

if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const text = `I scored ${lastScore.toFixed(1)} in Farcaster Endless Runner Lite! Can you beat me?`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Share text copied to clipboard. Paste it in your Farcaster post!');
    }).catch(()=>{
      prompt('Copy this text and paste into Farcaster:', text);
    });
  });
}

if (postBtn) {
  postBtn.addEventListener('click', async () => {
    alert('Posting to Farcaster requires authentication and signing from your wallet or a backend.\n\nFor now, the share text is copied to the clipboard so you can paste it into Farcaster.');
    const text = `I scored ${lastScore.toFixed(1)} in Farcaster Endless Runner Lite!`;
    try{ await navigator.clipboard.writeText(text); }catch(e){}
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    alert('Farcaster login requires OAuth/Wallet integration. See README.md for integration steps.');
  });
}
