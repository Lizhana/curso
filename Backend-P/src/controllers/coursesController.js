const courseService = require("../services/courseService");

const postCourse = async (req, res) => {
  try {
    const { title } = req.body;

    if(!title || !req.body.description || !req.body.image || !req.body.genre) {
      throw new Error("Estan faltando valores para crear un curso")
    }

    const foundCourses = await courseService.getCourseByTitleExactly(title);

    if(foundCourses.length) {
      for (const course of foundCourses) {
        if(course.title === title) throw new Error("Ya existe un curso con este nombre")
      }
    }

    const createdCourse = await courseService.createCourse(req.body);

    res.status(200).json({ message: "Curso creado con exito", data: createdCourse});
  } catch (error) {
    res.status(400).json({message: 'El servidor ha respondido con el siguiente error '+ error.message});
  }
};

const getAllCourses = async (req, res) => {
  try {
    const { page, size } = req.query;

    const courses = await courseService.getAllCourses(page, size);

    if (!courses.length) throw new Error('No se ha encontrado ningun curso');

    const totalCourses = await courseService.getTotalOfCourses();
    const totalPages = Math.ceil(totalCourses / size);
    
    res.status(200).json({
      message: "Cursos encontrados con exito", 
      data: courses,
      meta: {
        currentPage: page,
        totalCourses,
        totalPages,
        pageSize: size
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const {id} = req.params;

    const foundCourse = await courseService.getCourseById(id)

    if(!foundCourse) throw new Error(`No se encontro curso con el ID: ${id}`)

    res.status(200).json({ message: "Curso encontrado con exito", data: foundCourse})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const getCourseByTitle = async (req, res) => {
  try {
    const { title } = req.body;

    const courseTitle = await courseService.getCourseByTitle(title);

    if(!courseTitle.length) {
      throw new Error(`No se ha encontrado ningun curso con el titulo ${title}`)
    } 

    res.status(200).json({ message: "Curso encontrado con exito", data: courseTitle });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseByType = async (req, res) => {
  try {
    const { type } = req.body;

    const foundCourse = await courseService.getCourseByType(type);

    if(!foundCourse.length) {
      throw new Error(`No se ha encontrado ningun curso con el type ${type}`)
    } 

    res.status(200).json({ message: "Curso encontrado con exito", data: foundCourse });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    const foundCourses = await courseService.getCourseBygenre(genre);

    if(!foundCourses.length) throw new Error(`No se ha encontrado ningun curso con el pilar ${genre}`)

    res.status(200).json({message: "Cursos encontrado con exito", data: foundCourses});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const putCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const courseFound = courseService.getCourseById(id);
    
    if (!courseFound) throw new Error(`No se encontro curso con el id ${id}`);
    
    const updateCourse = await courseService.updateCourse({
      id: id,
      data: req.body,
    });

    res.status(200).json({message: "Curso actualizado con exito", data: updateCourse});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteACourse = async (req, res) => {
  try {
    const { id } = req.params;

    const foundCourse = await courseService.getCourseById(id);

    if (!foundCourse) throw new Error(`No se ha encontrado ningun curso con el ID: ${id}`);

    await courseService.deleteACourse(id);

    res.status(200).json({ message: `Se ha eliminado el curso ${foundCourse.title} correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const foundCourse = await courseService.getCourseById(id);
    
    if (!foundCourse) {
      throw new Error(`No se ha encontrado un curso con el id ${id}`);
    }
    if(foundCourse.deletedAt === null) {
      throw new Error("El curso no habia sido eliminado previamente");
    } 

    const restoredCourse = await courseService.restoreACourse(id);
    
    res.status(200).json({ 
      message: "El curso se ha restaurado con éxito", 
      data: restoredCourse 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postCourse,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  getCourseByType,
  getCourseByGenre,
  putCourse,
  deleteACourse,
  restoreCourse
};
