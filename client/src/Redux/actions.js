import axios        from "axios";
import * as actions from "../constants/actionsContants"

export function getCourses() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/courses");
      return dispatch({
        type: "GET_COURSES",
        payload: json.data.data,
      });
    } catch (error) {
      console.log("Error en getCourses/actions", error);
    }
  };
}

export function getCourseDetail(id) {
  return async function (dispatch) {
    try {
      const courseDetail = await axios.get(`http://localhost:3001/courses/id/${id}`);

      return dispatch({ type: actions.GET_COURSE_DETAIL, payload: courseDetail.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getSectionsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundSections = await axios.get(`http://localhost:3001/section/course/${courseId}`);

      return dispatch({ type: actions.GET_SECTIONS_BY_COURSE_ID, payload: foundSections.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const getCoursesByGenre = (genre) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/courses/genre/${genre}`);  
    dispatch({
      type: 'GET_COURSES_BY_GENRE',
      payload: res.data.data
    });
    } catch (error) {
      console.log("Error en getCoursesByGenre/actions", error);
    }
  };


export function getReviewsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundReviews = await axios.get(`http://localhost:3001/review/${courseId}`);

      return dispatch({ type: actions.GET_REVIEWS_BY_COURSE_ID, payload: foundReviews.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getInstructorById(id) {
  return async function (dispatch) {
    try {
      const foundInstructor = await axios.get(`http://localhost:3001/instructor/${id}`);

      return dispatch({ type: actions.GET_INSTRUCTOR_BY_ID, payload: foundInstructor.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getUsersByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundUsers = await axios.get(`http://localhost:3001/users/course/${courseId}`);

      return dispatch({ type: actions.GET_USERS_BY_COURSE_ID, payload: foundUsers.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getVideoById(id) {
  return async function (dispatch) {
    try {
      const foundVideo = await axios.get(`http://localhost:3001/videos/${id}`);

      return dispatch({ type: actions.GET_VIDEO_BY_ID, payload: foundVideo.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/users", payload);
    return response;
  };
};

export const getUserByCode = (code) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/users?code=${code}`);
    const user = response.data.data[0];
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
      return user;
    } else {
      return null;
    }
  } catch (error) {
    dispatch(loginFail(error.message));
    throw error;
  }
};

export const loginSuccess = (user) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  return {
    type: 'LOGOUT',
  };
};
export const loginFail = (error) => ({
  type: 'LOGIN_FAIL',
  payload: error,
});

export function createCourse(payload) {
  return async function (dispatch) {
  try {

      const response = await axios.post("http://localhost:3001/courses", payload)

      return dispatch({ type: actions.GET_COURSE_CREATE , payload: response.data.data })
    
  } catch (error) {
    console.log(error.message);
  }
  }
};

export function createSection({id, name}) {
  return async function (dispatch) {
  try {

      const response = await axios.post(`http://localhost:3001/section/${id}`,{name} )

      return dispatch({ type: actions.GET_SECTION_CREATE, payload: response.data.data })
    
  } catch (error) {
    console.log(error.message);
  }
  }
};

export function createVideo(payload, sectionId) {
  return async (dispatch) => {
    try {
      const createdVideo = await axios.post(`http://localhost:3001/videos/${sectionId}`, payload);

      dispatch({ type: actions.CREATE_VIDEO, payload: createdVideo.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createInstructor(payload) {
  return async (dispatch) => {
    try {
      const createdInstructor = await axios.post(`http://localhost:3001/instructor`, {
        name:            payload.name,
        description:     payload.description,
        profile_picture: payload.profile_picture,
        score:           payload.score,
        reviews:         payload.reviews,
        courseId:        payload.courseId
      });

      dispatch({ type: actions.CREATE_INSTRUCTOR, payload: createdInstructor.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createReview(payload) {
  return async (dispatch) => {
    try {
      const createdReview = await axios.post("http://localhost:3001/review", payload);

      dispatch({ type: actions.CREATE_REVIEW, payload: createdReview.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
