'use strict';

const formEl = document.querySelector('form');
const h3 = document.querySelector('h3');
const editId = document.getElementById('edit-id');
const insertpass = document.getElementById('insertpass');
const insertname = document.getElementById('insertname');
const insertmsg = document.getElementById('insertmsg');
const showall = document.getElementById('showall');
const containerData = document.getElementById('container-data');

const insertData = async (e) => {
  e.preventDefault();

  console.log(formEl.getAttribute('id'));
  if (insertname.value === '' || insertpass.value === '') return;

  if (formEl.getAttribute('id') === 'insert') {
    const formData = new FormData(formEl);

    const res = await fetch('insert.php', {
      method: 'post',
      body: formData,
    });
    const data = await res.text();
    if (data) {
      insertname.value = insertpass.value = '';
      insertmsg.textContent = data;

      setTimeout(() => {
        insertmsg.textContent = '';
        insertname.focus();
        show();
      }, 1000);
    }
  }

  if (formEl.getAttribute('id') === 'edit') {
    const formData = new FormData(formEl);

    const res = await fetch('edit.php', {
      method: 'post',
      body: formData,
    });

    const text = await res.text();
    if (text === 'Updated successfully') {
      formEl.id = 'insert';
      h3.textContent = 'Insert';
      editId.value = insertname.value = insertpass.value = '';
      insertpass.blur();
      show();
    } else {
      console.log(text);
    }
  }
};

const del = async (id) => {
  const user = confirm('Are you sure to delete?');
  if (user) {
    const res = await fetch('delete.php', {
      method: 'post',
      body: id,
      headers: {
        'Content-type': 'application/text',
      },
    });
    const data = await res.text();

    insertmsg.textContent = data;
    setTimeout(() => {
      insertmsg.textContent = '';

      show();
    }, 1000);
  }
};

const edit = async (data) => {
  data = data.split(',');
  formEl.id = 'edit';
  h3.textContent = 'Update';
  editId.value = data[0];
  insertname.value = data[1];
  insertpass.value = data[2];
};

const show = async () => {
  const res = await fetch('read.php');
  const datas = await res.json();
  containerData.innerHTML = '';
  datas.forEach((data, ind) => {
    const html = `
		<p id="db-data">
				<span>${ind + 1}</span>
				<span>${data.name}</span>
				<span>${data.pass}</span>
				<span id="edit" onclick="edit('${Object.values(data)}')">Edit</span>
				<span id="del" onclick="del(${data.id})">Delete</span>
			</p>
		`;

    containerData.insertAdjacentHTML('beforeend', html);
  });
};

////////////////////
formEl.addEventListener('submit', insertData);
showall.addEventListener('click', show);
