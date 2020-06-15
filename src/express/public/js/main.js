/* eslint-disable */
'use strict';

(function() {
  var deletEls = document.querySelectorAll('.js-delete');
  if (deletEls.length === 0) {
    return;
  }

  for (var i = 0; i < deletEls.length; i++) {
    deletEls[i].addEventListener('click', function(evt) {
      evt.target.setAttribute(`disabled`, `disabled`);
      const card = this.closest('.js-card');
      card.style.animation = ``;

      if (evt.target.id === `ticket-delete`) {
        const offerId = evt.target.dataset.offer;
        fetch(`http://localhost:3000/api/offers/${offerId}`, {
          method: `DELETE`
        })
          .then(() => {
            card.parentElement.removeChild(card);
          })
          .catch(() => {
            card.style.animation = `shake 0.6s`;
            evt.target.removeAttribute(`disabled`);
          })
      }
      if (evt.target.id === `comment-delete`) {
        const offerId = evt.target.dataset.offer;
        const commentId = evt.target.dataset.comment;
        fetch(`http://localhost:3000/api/offers/${offerId}/comments/${commentId}`, {
          method: `DELETE`,
        })
          .then(() => location.reload(true))
          .catch(() => {
            card.style.animation = `shake 0.6s`;
            evt.target.removeAttribute(`disabled`);
          })
      }
    })
  }
})();

'use strict';

(function () {
  var form = document.querySelector('.form');

  if (form) {
    var formFields = form.querySelectorAll('.js-field');
    var formButton = form.querySelector('.js-button');

    var setFillField = function (field) {
      if (field.value) {
        field.parentNode.classList.add('form__field--fill');
      } else {
        field.parentNode.classList.remove('form__field--fill');
      }
      field.addEventListener('focus', function () {
        field.parentNode.classList.add('form__field--focus');
      });
      field.addEventListener('blur', function () {
        field.parentNode.classList.remove('form__field--focus');
      });
    };

    var getFillFields = function () {
      var fill = true;
      for (var i = 0; i < formFields.length; i++) {
        if (!formFields[i].value) {
          fill = false;
          break;
        }
      }
      return fill;
    };

    Array.prototype.slice.call(formFields).forEach(function (field) {
      setFillField(field);
    });

    Array.prototype.slice.call(formFields).forEach(function (field) {
      field.addEventListener('input', function () {
        setFillField(field);
        if (formButton) {
          if (getFillFields()) {
            formButton.removeAttribute('disabled');
          } else {
            formButton.setAttribute('disabled', 'disabled');
          }
        }
      });
    });

    var selects = document.querySelectorAll('.js-multiple-select');
    for (var i = 0; i < selects.length; i++) {
      var placeholder = selects[i].dataset['label'];
      const selectrConfig = {
        defaultSelected: false,
        searchable: false,
        multiple: true,
        width: 222,
        placeholder: placeholder,
        data: selects[i].dataset['categories'].split(`,`)
          .map((id, index) => ({
            value: id,
            text: selects[i].dataset['titles'].split(`,`)[index],
            selected: selects[i].dataset['active'].split(`,`).includes(id)
          })),
        selectedValue: selects[i].dataset['active'].split(`,`)
      };
      const SS = new Selectr(selects[i], selectrConfig);
    }

    var priceField = form.querySelector('.js-price');
    if (priceField) {
      priceField.addEventListener('keydown', function(e) {
        if (window.event.keyCode >= 65 && window.event.keyCode <= 90 || window.event.keyCode === 189 || window.event.keyCode === 188) {
          e.preventDefault();
        }
        if (window.event.keyCode === 190 && (!priceField.value || priceField.value.includes('.'))) {
          e.preventDefault();
        }
      })
    }
  }

})();

'use strict';

(function () {
  var signUpAvatarContainer = document.querySelector('.js-preview-container');

  if (signUpAvatarContainer) {
    var signUpFieldAvatarInput = signUpAvatarContainer.querySelector('.js-file-field');
    var signUpAvatar = signUpAvatarContainer.querySelector('.js-preview');

    var readFilePhoto = function (file) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var image = document.createElement('img');
        image.src = reader.result;
        signUpAvatar.innerHTML = '';
        signUpAvatar.appendChild(image);
      });
      reader.readAsDataURL(file);
    };

    signUpFieldAvatarInput.addEventListener('change', function () {
      var file = signUpFieldAvatarInput.files[0];
      readFilePhoto(file);
      signUpAvatarContainer.classList.add('uploaded');
    });
  }
})();

'use strict';

(function () {
  svg4everybody();
})();

'use strict';

(function () {
  var search = document.querySelector('.search');

  if (search) {
    var searchInput = search.querySelector('.search input');
    var searchCloseButton = search.querySelector('.search__close-btn');

    if (searchInput.value) {
      search.classList.add('search--active');
      searchCloseButton.classList.add('search__close-btn--active');
    } else {
      search.classList.remove('search--active');
      searchCloseButton.classList.remove('search__close-btn--active');
    }

    searchInput.addEventListener('change', function () {
      if (searchInput.value) {
        search.classList.add('search--active');
      } else {
        search.classList.remove('search--active');
      }
    });

    searchInput.addEventListener('input', function () {
      if (searchInput.value) {
        searchCloseButton.classList.add('search__close-btn--active');
      } else {
        searchCloseButton.classList.remove('search__close-btn--active');
      }
    });

    searchCloseButton.addEventListener('click', function () {
      searchCloseButton.classList.remove('search__close-btn--active');
      searchInput.value = '';
      search.classList.remove('search--active');
    });
  }
})();

// create comment
'use strict';

(function () {
  const commentForm = document.forms[`comment`];
  if (!commentForm) {
    return;
  }

  const textField = commentForm.querySelector(`textarea`);

  commentForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    cleanForm(commentForm);
    const offerId = commentForm.dataset.offer;
    setFormDisabled(commentForm, true);

    fetch(`http://localhost:3000/api/offers/${offerId}/comments`, {
      method: `POST`,
      body: JSON.stringify({text: textField.value.trim()}),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
      })
      .then(() => location.reload(true))
      .catch(() => {
        commentForm.style.animation = `shake 0.6s`;
        setFormDisabled(commentForm, false);
      })
  });
})();

// login
'use strict';

(function () {
  const loginForm = document.forms[`login`];
  if (!loginForm) {
    return;
  }

  const emailField = loginForm.querySelector(`[type=email]`);
  const passwordField = loginForm.querySelector(`[type=password]`);

  loginForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    cleanForm(loginForm);
    setFormDisabled(loginForm, true);

    fetch(`http://localhost:3000/api/login`, {
      method: `POST`,
      body: JSON.stringify({
        email: emailField.value.trim(),
        password: passwordField.value
      }),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
      })
      .then(() => location.reload(true))
      .catch(() => {
        loginForm.style.animation = `shake 0.6s`;
        setFormDisabled(loginForm, false);
      })
  });
})();

//  sign-up
'use strict';

(function () {
  const signUpForm = document.forms[`sign-up`];
  if (!signUpForm) {
    return;
  }

  const passwordField = signUpForm.querySelector(`[name=user-password]`);
  const passwordAgainField = signUpForm.querySelector(`[name=user-password-again]`);
  const avatarInput = signUpForm.querySelector(`[name=avatar]`);

  signUpForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    cleanForm(signUpForm);

    if (passwordField.value !== passwordAgainField.value) {
      createPasswordError(signUpForm);
      return;
    }

    const correctFileTypes = [`image/png`, `image/jpeg`];
    if (!correctFileTypes.includes(avatarInput.files[0].type)) {
      createAvatarError(signUpForm);
      return;
    }

    const formData = new FormData(signUpForm);
    setFormDisabled(signUpForm, true);

    fetch(`http://localhost:3000/api/register`, {
      method: `POST`,
      body: formData
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
      })
      .then(() => location.assign(`/login`))
      .catch(() => {
        signUpForm.style.animation = `shake 0.6s`;
        setFormDisabled(signUpForm, false);
      })
  });
})();

//  helpers
'use strict';

(function () {
  window.setFormDisabled = (form, status) => {
    const inputs = form.querySelectorAll(`input`);
    const textArea = form.querySelector(`textarea`);
    const select = form.querySelector(`select`);

    if (status) {
      form.setAttribute(`disabled`, `disabled`);
    } else {
      form.removeAttribute(`disabled`);
    }

    if (textArea && status) {
      textArea.setAttribute(`disabled`, `disabled`);
    } else if (textArea && !status) {
      textArea.removeAttribute(`disabled`);
    }

    if (select && status) {
      select.setAttribute(`disabled`, `disabled`);
    } else if (select && !status) {
      select.removeAttribute(`disabled`);
    }

    if (inputs.length) {
      inputs.forEach((input) => {
        if (status) {
          input.setAttribute(`disabled`, `disabled`);
        } else {
          input.removeAttribute(`disabled`);
        }
      })
    }
  };

  window.createPasswordError = (form) => {
    const errorMessage = document.createElement(`p`);
    errorMessage.classList.add(`text`, `text--error`);
    errorMessage.innerText = `Пароли должны совпадать`;
    form.querySelectorAll(`[type=password]`).forEach((input) => {
      input.parentElement.classList.add(`field--error`);
    });
    form.insertBefore(errorMessage, form.lastElementChild);
  };

  window.createAvatarError = (form) => {
    const errorMessage = document.createElement(`p`);
    errorMessage.classList.add(`text`, `text--error`);
    errorMessage.innerText = `Допустимые расширения файла .jpeg, .jpg, .png`;
    form.insertBefore(errorMessage, form.querySelector(`[type=file]`).parentElement.parentElement);
  };

  window.cleanForm = (form) => {
    form.style.animation = ``;
    form
      .querySelectorAll(`.text--error`)
      .forEach((message) => form.removeChild(message));
    form
      .querySelectorAll(`input`)
      .forEach((input) => input.parentElement.classList.remove(`field--error`));
  };
})();

//# sourceMappingURL=main.js.map
