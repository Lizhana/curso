import React           from "react";
import ReactPlayer     from 'react-player';
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useMatch }    from "react-router-dom";
import { useSelector } from "react-redux";
import { useState }    from "react";
//----Components
import certifiedImg from "../../images/certified-portamor.svg"
import CustomButton from "../CustomButton/CustomButton";
import SelectedData from "../SelectedData/SelectedData";
//----Styles
import styles from "./ClassDetail.module.css";
//----Actions, Utils, Constants
import * as actions   from "../../Redux/actions";
import * as utils     from "../../utils";
import * as constants from "../../constants";

const ClassDetail = (props) => {
  const dispatch = useDispatch();
  const match    = useMatch('/clase/:courseId/:videoId');
  const courseId = match.params.courseId;
  const videoId  = match.params.videoId;

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    dispatch(actions.getVideoById(videoId));
  }, [courseId, videoId, dispatch])

  const videoDetail  = useSelector((state) => state.videoDetail);
  const courseDetail = useSelector((state) => state.courseDetail);
  const courseRating = utils.getStarsRating(courseDetail.rating);

  const [firstSelectedButton, setFirstSelectedButton]   = useState(constants.VER_TEMARIO);
  const [secondSelectedButton, setSecondSelectedButton] = useState(constants.COMENTARIOS);

  const handleFirstSelectData  = (selectedButtonContent) => setFirstSelectedButton(selectedButtonContent);
  const handleSecondSelectData = (selectedButtonContent) => setSecondSelectedButton(selectedButtonContent);

  return (
    <div className={styles["class-detail-main"]}>
      <div className={styles["video-description-container"]}>
        <div>
          <h1 className={styles["course-title"]}>
            Curso de {" "}
            <span className={styles["course-title-color"]}>{courseDetail.title}</span>
          </h1>
          <div className={styles["react-player"]}>
            <ReactPlayer 
            url={videoDetail.videoLink} 
            width='100%'
            height='100%' />
          </div>
        </div>
        
        <div className={styles["description-container"]}>
          <h2 className={styles["description-title"]}>Descripcion del curso</h2>
          <p className={styles["description-text"]}>{ courseDetail.description }</p>
          <span className={styles["stars-container"]}>
            Valoracion del curso: { courseRating }
          </span>
          <div className={styles["certified-container"]}>
            <span>Incluye certificado:</span>
            <strong>Si</strong>
            <img src={certifiedImg} alt="certified" />
          </div>
          <div className={styles["buttons-container"]}>
            <CustomButton 
            primary={firstSelectedButton === constants.VER_TEMARIO ? true : false}  
            content={constants.VER_TEMARIO}
            onClick={() => handleFirstSelectData(constants.VER_TEMARIO)} />
            <CustomButton 
            primary={firstSelectedButton === constants.SOBRE_EL_INSTRUCTOR ? true : false}  
            content={constants.SOBRE_EL_INSTRUCTOR}
            onClick={() => handleFirstSelectData(constants.SOBRE_EL_INSTRUCTOR)} />
          </div>
        </div>
      </div>

      <div className={styles["secciones-temario-container"]}>
        <div className={styles["buttons-and-cards-container"]}>
          <div className={styles["buttons-sections-container"]}>
            <CustomButton 
            primary={secondSelectedButton === constants.COMENTARIOS ? true : false}  
            content={constants.COMENTARIOS}
            onClick={() => handleSecondSelectData(constants.COMENTARIOS)} />
            <CustomButton 
            primary={secondSelectedButton === constants.MATERIALES ? true : false}
            content={constants.MATERIALES}
            onClick={() => handleSecondSelectData(constants.MATERIALES)} />
            <CustomButton 
            primary={secondSelectedButton === constants.PARTICIPANTES ? true : false}
            content={constants.PARTICIPANTES} 
            onClick={() => handleSecondSelectData(constants.PARTICIPANTES)} />
            <CustomButton 
            primary={secondSelectedButton === constants.PREGUNTAS_FRECUENTES ? true : false}
            content={constants.PREGUNTAS_FRECUENTES}
            onClick={() => handleSecondSelectData(constants.PREGUNTAS_FRECUENTES)} />
          </div>

          <div className={styles["cards-container"]}>
            {
            secondSelectedButton && 
            <SelectedData 
              courseId={courseId}
              courseDetail={courseDetail} 
              selectedButtonContent={secondSelectedButton} />
            }
          </div>
        </div>
        
        {
          firstSelectedButton && 
          <SelectedData 
            courseId={courseId}
            courseDetail={courseDetail} 
            selectedButtonContent={firstSelectedButton} />
        }
      </div>
    </div>

  )
};

export default ClassDetail;