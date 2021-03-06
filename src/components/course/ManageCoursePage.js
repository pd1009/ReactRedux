import React , { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class ManageCoursesPage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			course: Object.assign({}, this.props.course),
			errors: {},
			saving: false
		};

		this.updatetCourseState = this.updatetCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.course.id != nextProps.course.id) {
			// 
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	updatetCourseState(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	redirect() {
		this.setState({saving: false});
		toastr.success('Course Saved');
		this.context.router.push('/courses');
	}

	saveCourse(event) {
		event.preventDefault();
		this.setState({saving: true});
		this.props.actions.saveCourse(this.state.course).then(() => {
			this.redirect();
		}).catch((error) => {
			toastr.error(error);
			this.setState({saving: false});
		});
		// browserHistory.push('/courses');
		
		
	}

	render() {
		return (
				<CourseForm course={this.state.course} errors={this.state.errors}
					allAuthors={this.props.authors} onChange={this.updatetCourseState}
					onSave={this.saveCourse} saving={this.state.saving}
				/>
		);
	}
}

ManageCoursesPage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

ManageCoursesPage.contextTypes = {
	router: PropTypes.object
};

function getCourseById(courses, courseId) {
	const course = courses.filter(course => course.id === courseId);
	return course.length ? course[0] : null;
}

function mapStateToProps(state, ownProps) {
	const courseId = ownProps.params.id;
	let course = {id: '', watchHref:'' , title: '', authorId: '', length: '', category: ''};

	if (courseId && state.courses.length) {
		course = getCourseById(state.courses, courseId);
	}

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});

	return {
		course: course,
		authors: authorsFormattedForDropdown
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);