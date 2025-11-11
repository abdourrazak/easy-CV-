import { Education } from '@/type';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    educations: Education[];
    setEducations: (educations: Education[]) => void;
}

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {

    const [newEducation, setNewEducation] = useState<Education>(
        {
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof Education) => {
        setNewEducation({ ...newEducation, [fied]: e.target.value })
    }

    const handleExistingChange = (index: number, field: keyof Education, value: string) => {
        const updatedEducations = [...educations]
        updatedEducations[index] = { ...updatedEducations[index], [field]: value }
        setEducations(updatedEducations)
    }

    const handleAddEducation = () => {
        setEducations([...educations, newEducation])
        setNewEducation(
            {
                school: '',
                degree: '',
                startDate: '',
                endDate: '',
                description: '',
            }
        )
    }

    const handleDeleteEducation = (index: number) => {
        const updatedEducations = educations.filter((_, i) => i !== index)
        setEducations(updatedEducations)
    }

    return (
        <div>
            {/* Afficher les éducations existantes */}
            {educations.map((edu, index) => (
                <div key={index} className='flex flex-col gap-4 mb-6 p-4 border border-primary rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-semibold text-primary'>Éducation {index + 1}</span>
                        <button
                            onClick={() => handleDeleteEducation(index)}
                            className='btn btn-error btn-xs'
                        >
                            <Trash2 className='w-3' />
                        </button>
                    </div>
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            placeholder="Nom de l'école"
                            value={edu.school}
                            onChange={(e) => handleExistingChange(index, 'school', e.target.value)}
                            className='input input-bordered w-full'
                        />
                        <input
                            type="text"
                            placeholder="Diplôme"
                            value={edu.degree}
                            onChange={(e) => handleExistingChange(index, 'degree', e.target.value)}
                            className='input input-bordered w-full ml-4'
                        />
                    </div>

                    <div className='flex justify-between'>
                        <input
                            type="date"
                            placeholder='Date de début'
                            value={edu.startDate}
                            onChange={(e) => handleExistingChange(index, 'startDate', e.target.value)}
                            className='input input-bordered w-full'
                        />
                        <input
                            type="date"
                            placeholder='Date de fin'
                            value={edu.endDate}
                            onChange={(e) => handleExistingChange(index, 'endDate', e.target.value)}
                            className='input input-bordered w-full ml-4'
                        />
                    </div>
                    
                    <textarea
                        placeholder='Description'
                        value={edu.description}
                        onChange={(e) => handleExistingChange(index, 'description', e.target.value)}
                        className='input input-bordered w-full'
                    ></textarea>
                </div>
            ))}

            {/* Formulaire pour ajouter une nouvelle éducation */}
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder="Nom de l'école"
                        value={newEducation.school}
                        onChange={(e) => handleChange(e, 'school')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Diplôme"
                        value={newEducation.degree}
                        onChange={(e) => handleChange(e, 'degree')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Date de début'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newEducation.startDate}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Date de fin'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newEducation.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>
                
                <textarea
                    placeholder='Description'
                    value={newEducation.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full'
                ></textarea>
            </div>

            <button
                onClick={handleAddEducation}
                className='btn btn-primary mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>

        </div>
    )
}

export default EducationForm
