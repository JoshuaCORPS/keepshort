import '@babel/polyfill';
import { shortenUrl, deleteUrl } from './short';

const formShortUrl = document.getElementById('form-short-url');
const formDeleteUrl = document.getElementById('form-delete-url');
const copyUrl = document.getElementById('copy');

if (formShortUrl) {
  formShortUrl.addEventListener('submit', async e => {
    e.preventDefault();

    document.getElementById('short').textContent = 'Working on it...';

    let full = document.getElementById('url').value;
    full = full.startsWith('http') ? full : `http://${full}`;

    if (full) await shortenUrl(full);

    document.getElementById('short').textContent = 'Shorten';
  });
}

if (copyUrl) {
  $('#copy').tooltip();
  copyUrl.addEventListener('click', () => {
    const copyText = document.getElementById('url');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');

    $('#copy')
      .attr('data-original-title', 'Copied')
      .tooltip('show');
  });

  copyUrl.addEventListener('mouseout', () => {
    $('#copy').attr('data-original-title', 'Copy to clipboard');
  });
}

if (formDeleteUrl) {
  formDeleteUrl.addEventListener('submit', async e => {
    e.preventDefault();

    const short = formDeleteUrl.dataset.shorturl;
    window.confirm('Do you want to delete this URL?')
      ? await deleteUrl(short)
      : null;
  });
}
