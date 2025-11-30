require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const connectDB = require('./config/db');

const sampleBooks = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South",
    price: 12.99,
    category: "Fiction",
    stock: 25,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian masterpiece about totalitarianism and surveillance",
    price: 14.99,
    category: "Fiction",
    stock: 30,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of decadence and excess in the Jazz Age",
    price: 10.99,
    category: "Classic",
    stock: 20,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners set in Georgian England",
    price: 11.99,
    category: "Romance",
    stock: 15,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure following Bilbo Baggins in Middle-earth",
    price: 13.99,
    category: "Fantasy",
    stock: 40,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "A young wizard discovers his magical heritage and attends Hogwarts",
    price: 15.99,
    category: "Fantasy",
    stock: 50,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A story of teenage rebellion and alienation in 1950s New York",
    price: 10.99,
    category: "Classic",
    stock: 18,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic high-fantasy adventure to destroy the One Ring",
    price: 24.99,
    category: "Fantasy",
    stock: 35,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400"
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description: "A coming-of-age novel following an orphaned girl's journey",
    price: 12.49,
    category: "Classic",
    stock: 22,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description: "A dystopian novel about a futuristic World State",
    price: 13.49,
    category: "Fiction",
    stock: 28,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    
    console.log('🗑️  Clearing existing books...');
    const deleteResult = await Book.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} existing books`);
    
    console.log('📚 Adding new books...');
    const insertResult = await Book.insertMany(sampleBooks);
    console.log(`   Successfully inserted ${insertResult.length} books`);
    
    console.log('\n✅ Database seeding completed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Total books in database: ${sampleBooks.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📖 Books added:');
    sampleBooks.forEach((book, index) => {
      console.log(`   ${index + 1}. ${book.title} by ${book.author} - $${book.price}`);
    });
    console.log('\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(error.message);
    process.exit(1);
  }
};

seedDatabase();