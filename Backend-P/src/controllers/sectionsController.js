const courseService  = require("../services/courseService");
const sectionService = require("../services/sectionService");

const postSection = async (req, res) => {
  try {
    const { name }     = req.body;
    const { courseId } = req.params;

    if(!name) throw new Error("Estan faltando valores para crear un curso")

    const foundCourse = await courseService.getCourseById(courseId);

    if(!foundCourse) throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`);

    const createdSection = await sectionService.createSection(name, courseId);

    res.status(201).json({ message: "Seccion creada correctamente", data: createdSection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getASectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const foundSection = await sectionService.getSectionById(sectionId);

    if(!foundSection) throw new Error(`No se encontro la seccion con el id ${sectionId}`)

    res.status(200).json({ message: "Seccion obtenida con exito", data: foundSection});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSectionsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const sections = await sectionService.getSectionsByCourseId(courseId);
    
    if (!sections.length) throw new Error(`La seccion del curso ${courseId} esta vacia`)
    
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const sectionFound = sectionService.getSectionById(sectionId);
    
    if (!sectionFound) throw new Error(`No se encontro una seccion con el id ${id}`);

    const updateSection = await sectionService.putSection({
      id: sectionId,
      data: req.body,
    });
    
    res.status(200).json({ message: "Seccion actualizada con exito", data:updateSection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteASection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const foundSection  = await sectionService.getSectionById(sectionId);

    if (!foundSection) throw new Error(`No se encontro una seccion con el ID: ${id}`);

    await sectionService.deleteSection(foundSection.id);
    
    res.status(200).json({ message: `Se ha eliminado el curso ${foundSection.name} correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const foundSection = await sectionService.getSectionById(sectionId);

    if (!foundSection) {
      throw new Error(`No se encontro una seccion con el id ${sectionId}`);
    } 
    if(foundSection.deletedAt === null) {
      throw new Error("La seccion no habia sido eliminada previamente");
    } 

    const restoredSection = await sectionService.restoreSection(foundSection.id);

    res.status(200).json({ message: "La seccion se ha restaurado con éxito", data: restoredSection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSections = async (req, res)=> {
  try {
    const getSections = await sectionService.getAllSection()
    if (!getSections.length) {
      throw new Error('No hay Sections')
    }
    res.status(200).json({message: "se encontraron sections", data: getSections})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  postSection,
  getASectionById,
  getSectionsByCourseId,
  putSection,
  deleteASection,
  restoreSection,
  getAllSections
};
