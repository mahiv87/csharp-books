import Carousel from './components/Carousel';
import ExploreTopBooks from './components/ExploreTopBooks';
import Hero from './components/Hero';
import LibraryService from './components/LibraryService';

const Homepage = () => {
	return (
		<>
			<ExploreTopBooks />
			<Carousel />
			<Hero />
			<LibraryService />
		</>
	);
};

export default Homepage;
