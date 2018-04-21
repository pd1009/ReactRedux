import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Preloader from './Preloader';

const Header = ({loading}) => {
	return (
		<nav>
			<IndexLink to="/" activeClassName="active">Home</IndexLink>
			{" | "}
			<Link to="/about" activeClassName="active">About</Link>
			{" | "}
			<Link to="/courses" activeClassName="active">Courses</Link>
			{loading && <Preloader interval={200} dots={5} />}
		</nav>
	);
};

Header.propTypes = {
	loading: PropTypes.bool.isRequired
};

export default Header;