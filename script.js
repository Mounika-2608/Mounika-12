// Quiz Data
const quizData = [
    {
      question: "What is the main ingredient in most types of bread?",
      options: ["Flour", "Sugar", "Eggs", "Milk"],
      answer: "Flour"
    },
    {
      question: "What is a croissant traditionally filled with?",
      options: ["Chocolate", "Cheese", "Jam", "Cream"],
      answer: "Chocolate"
    },
    {
      question: "Which pastry is known for its layers of dough and butter?",
      options: ["Brioche", "Croissant", "Muffin", "Scone"],
      answer: "Croissant"
    }
  ];
  
  let currentQuestion = 0;
  
  // Load Quiz
  const loadQuiz = () => {
    const quizElement = document.getElementById("quiz");
    const { question, options } = quizData[currentQuestion];
    quizElement.innerHTML = `
      <p>${question}</p>
      ${options.map((option, index) => `
        <label>
          <input type="radio" name="answer" value="${option}" id="option-${index}">
          ${option}
        </label>
        <br>
      `).join('')}
    `;
  };
  
  // Handle Next Question
  document.getElementById("nextButton").addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && selectedAnswer.value === quizData[currentQuestion].answer) {
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer. Try again.");
    }
  
    currentQuestion = (currentQuestion + 1) % quizData.length;
    loadQuiz();
  });
  
  // Load Initial Quiz
  loadQuiz();
  
  // Image Carousel
  const images = [
    "https://via.placeholder.com/300x200?text=Bread",
    "https://via.placeholder.com/300x200?text=Cake",
    "https://via.placeholder.com/300x200?text=Pastry",
    "https://via.placeholder.com/300x200?text=Croissant"
  ];
  
  let imageIndex = 0;
  
  const carouselImage = document.getElementById("carouselImage");
  
  const nextImage = () => {
    imageIndex = (imageIndex + 1) % images.length;
    carouselImage.src = images[imageIndex];
  };
  
  carouselImage.addEventListener("click", nextImage);
  
  // Fetch Bakery Joke from API
  const fetchJoke = async () => {
    try {
      const response = await fetch("https://api.jokes.one/jod?category=animal");
      const data = await response.json();
      const joke = data.contents.jokes[0].joke.text;
      document.getElementById("bakeryJoke").textContent = joke;
    } catch (error) {
      document.getElementById("bakeryJoke").textContent = "What did the bread say to the butter?I’m on a roll today!";
    }
  };
  
  fetchJoke();
  
  // Handle Bakery Order
  const orders = [];
  
  document.getElementById("addOrderButton").addEventListener("click", () => {
    const bakeryOrder = document.getElementById("bakeryOrder").value;
    if (bakeryOrder) {
      orders.push(bakeryOrder);
      const orderList = document.getElementById("orderList");
      const listItem = document.createElement("li");
      listItem.textContent = bakeryOrder;
      orderList.appendChild(listItem);
      document.getElementById("bakeryOrder").value = ''; // Clear input field
    }
  });
  
  document.getElementById("submitOrderButton").addEventListener("click", () => {
    if (orders.length > 0) {
      document.getElementById("orderResponse").textContent = `You have ordered: ${orders.join(", ")}`;
    } else {
      document.getElementById("orderResponse").textContent = "Please add some bakery items to your order.";
    }
  });
  