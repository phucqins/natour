/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      const userNameEl = document.querySelector('.nav__user-name');
      const userPhoto = document.querySelector('.form__user-photo');
      const navUserPhoto = document.querySelector('.nav__user-img');

      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      userNameEl.innerHTML = res.data.data.user.name.split(' ')[0];
      userPhoto.src = `/img/users/${res.data.data.user.photo}`;
      navUserPhoto.src = `/img/users/${res.data.data.user.photo}`;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
