import axios from 'axios';
import shortId from 'shortid';

// FROM STACKOVERFLOW
function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

export const shortenUrl = async full => {
  try {
    if (validURL(full)) {
      const short = shortId.generate();
      const createdUrl = await axios({
        method: 'POST',
        url: '/',
        data: {
          full,
          short
        }
      });

      if (createdUrl.data.status === 'Success') {
        window.setTimeout(() => {
          location.assign(`/result/${short}`);
        }, 500);
      }
    } else {
      alert('Invalid URL.');
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUrl = async short => {
  try {
    await axios({
      method: 'DELETE',
      url: `/result/${short}`,
      data: {
        short
      }
    });

    window.setTimeout(() => {
      location.assign('/');
    }, 500);
  } catch (err) {
    console.log(err);
  }
};
