"use client"
import { Eye, RotateCw, Save } from "lucide-react";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "./components/CVPreview";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('nord')
  const [zoom, setZoom] = useState<number>(100)
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);

  useEffect(() => {
    const defaultImageUrl = '/toffProfile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "toffProfile.jpg", { type: blob.type })

        setFile(defaultFile)

      })
  }, [])

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]

  const handleResetPersonalDetails = () => {
    setPersonalDetails(personalDetailsPreset)
    // Réinitialiser l'image par défaut
    const defaultImageUrl = '/toffProfile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "toffProfile.jpg", { type: blob.type })
        setFile(defaultFile)
      })
  }

  const handleResetExperiences = () => setExperience(experiencesPreset)
  const handleResetEducations = () => setEducations(educationsPreset)
  const handleResetLanguages = () => setLanguages(languagesPreset)
  const handleResetSkills = () => setSkills(skillsPreset)
  const handleResetHobbies = () => setHobbies(hobbiesPreset);

  const cvPreviewRef = useRef(null)

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if(element){
      try {

        const canvas = await html2canvas(element , {
          scale : 2,
          useCORS: true,
          height: 1050,
          windowHeight: 1050
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.85)

        const pdf = new jsPDF({
          orientation:"portrait",
          unit:'mm',
          format:"a4",
          compress: true
        })
        
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        
        // Calculer la hauteur proportionnelle mais limiter à la hauteur A4
        const imgHeight = (canvas.height * pdfWidth) / canvas.width
        const finalHeight = Math.min(imgHeight, pdfHeight)

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight, undefined, 'FAST');
        pdf.save(`cv.pdf`)

        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if(modal){
          document.body.classList.remove('modal-open')
          modal.close()
        }

        confetti({
             particleCount: 100,
             spread: 70 ,
             origin: {y:0.6},
             zIndex:9999
        })

      } catch (error) {
         console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }


  return (
    <div>
      <section className="flex min-h-screen">

          <div className="w-full lg:w-1/3 lg:h-screen p-4 sm:p-6 lg:p-10 bg-base-200 scrollable no-scrollbar ">
            <div className="mb-4 flex justify-between items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold italic">
                Easy
                <span className="text-primary">CV</span>

              </h1>

              <button className="btn btn-primary" onClick={() => {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
                document.body.classList.add('modal-open');
                modal.showModal();
              }}>
                Prévisualiser
                <Eye className="w-4" />
              </button>
            </div>

            <div className="flex  flex-col gap-4 sm:gap-6 rounded-lg">

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Qui êtes-vous ?</h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Expériences</h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <ExperienceForm
                experience={experiences}
                setExperiences={setExperience}
              />


              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Éducations</h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Langues</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <LanguageForm
                languages={languages}
                setLanguages={setLanguages}
              />

              <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">

                <div className="w-full lg:w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Compétences</h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div className="w-full lg:w-1/2 lg:ml-4">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>



              </div>


            </div>

          </div>

          <div className="hidden lg:block w-2/3 h-screen bg-base-100 bg-[url('/file.svg')] bg-cover  bg-center scrollable-preview relative">


            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5 gap-2">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary" />
              <p className="text-sm text-primary">{zoom}%</p>
            </div>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select select-bordered fixed z-[9999] select-sm top-12 right-5"
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </select>

            <div
              className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`
              }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}

              />
            </div>

          </div>

      </section>




        <dialog id="my_modal_3" className="modal modal-open:overflow-hidden">
          <div className="modal-box w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 max-h-screen overflow-y-auto">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
                onClick={() => document.body.classList.remove('modal-open')}
              >✕</button>
            </form>

            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button onClick={handleDownloadPdf} className="btn btn-primary btn-sm">
                  Télécharger
                  <Save className='w-4' />
                </button>
              </div>

              <div className="w-full overflow-hidden">
                <div className="w-full flex justify-center items-center">
                  <div className="transform scale-50 sm:scale-75 lg:scale-100 origin-top">
                    <CVPreview
                      personalDetails={personalDetails}
                      file={file}
                      theme={theme}
                      experiences={experiences}
                      educations={educations}
                      languages={languages}
                      hobbies={hobbies}
                      skills={skills}
                      download={true}
                      ref={cvPreviewRef}

                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </dialog>

    </div>
  );
}
