let results = [];

fetch('results.json')
  .then(res => res.json())
  .then(data => {
    results = data;

    if (window.location.pathname.includes("result.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const regNo = urlParams.get('reg');
      showResult(regNo);
    }
  });

function searchResult() {
  const regNo = document.getElementById('regInput').value.trim();
  const student = results.find(s => s.reg_no === regNo);
  if (student) {
    window.location.href = `result.html?reg=${regNo}`;
  } else {
    document.getElementById('error').classList.remove('hidden');
  }
}

function showResult(regNo) {
  const student = results.find(s => s.reg_no === regNo);
  if (!student) return;

  document.getElementById('resultCard').classList.remove('hidden');
  document.getElementById('rno').innerText = student.reg_no;
  document.getElementById('name').innerText = student.name;
  document.getElementById('mark').innerText = student.mark;
  document.getElementById('rank').innerText = student.rank;
  const scholarshipText = `Congratulations Dear ${student.name.toUpperCase()}, You will Get a Scholarship of ₹${student.amount}/-`;
  const scholarshipElem = document.getElementById('scholarshipText');
  scholarshipElem.innerText = scholarshipText;
  scholarshipElem.classList.add('blinking');
}
