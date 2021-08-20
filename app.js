'use strict';

const insert = document.getElementById('insert');
const insertpass = document.getElementById('insertpass');
const insertname = document.getElementById('insertname');
const insertmsg = document.getElementById('insertmsg');
const showall = document.getElementById('showall');
const containerData = document.getElementById('container-data');

const insertData = async (e) => {
  e.preventDefault();

  if (insertname.value !== '' && insertpass.value !== '') {
    const formData = new FormData(insert);

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
  const res = await fetch('edit.php', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/html',
    },
  });

  const text = await res.text();
  console.log(text);
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
insert.addEventListener('submit', insertData);
showall.addEventListener('click', show);
