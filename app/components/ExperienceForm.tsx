import { Experience } from '@/type';
import { Plus, Trash2, Calendar } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    experience: Experience[];
    setExperiences: (experience: Experience[]) => void
}



const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {

    const [newExperience, setNewExperience] = useState<Experience>({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof Experience) => {
        setNewExperience({ ...newExperience, [fied]: e.target.value })
    }

    const handleExistingChange = (index: number, field: keyof Experience, value: string) => {
        const updatedExperiences = [...experience]
        updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
        setExperiences(updatedExperiences)
    }

    const handleAddExperience = () => {
        setExperiences([...experience, newExperience])
        setNewExperience(
            {
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                description: '',
            }
        )
    }

    const handleDeleteExperience = (index: number) => {
        const updatedExperiences = experience.filter((_, i) => i !== index)
        setExperiences(updatedExperiences)
    }



    return (

        <div>
            {/* Afficher les expériences existantes */}
            {experience.map((exp, index) => (
                <div key={index} className='flex flex-col gap-4 mb-6 p-4 border border-primary rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-semibold text-primary'>Expérience {index + 1}</span>
                        <button
                            onClick={() => handleDeleteExperience(index)}
                            className='btn btn-error btn-xs'
                        >
                            <Trash2 className='w-3' />
                        </button>
                    </div>
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            placeholder='Nom complet'
                            value={exp.jobTitle}
                            onChange={(e) => handleExistingChange(index, 'jobTitle', e.target.value)}
                            className='input input-bordered w-full'
                        />
                        <input
                            type="text"
                            placeholder="Nom de l'entreprise"
                            value={exp.companyName}
                            onChange={(e) => handleExistingChange(index, 'companyName', e.target.value)}
                            className='input input-bordered w-full ml-4'
                        />
                    </div>

                    <div className='flex justify-between'>
                        <label className='input input-bordered flex items-center gap-2 w-full'>
                            <Calendar className='w-3 h-3 opacity-70' />
                            <input
                                type="date"
                                placeholder='Date de début'
                                value={exp.startDate}
                                onChange={(e) => handleExistingChange(index, 'startDate', e.target.value)}
                                className='grow'
                            />
                        </label>
                        <label className='input input-bordered flex items-center gap-2 w-full ml-4'>
                            <Calendar className='w-3 h-3 opacity-70' />
                            <input
                                type="date"
                                placeholder='Date de fin'
                                value={exp.endDate}
                                onChange={(e) => handleExistingChange(index, 'endDate', e.target.value)}
                                className='grow'
                            />
                        </label>
                    </div>
                    <textarea
                        placeholder='Description'
                        value={exp.description}
                        onChange={(e) => handleExistingChange(index, 'description', e.target.value)}
                        className='input input-bordered w-full'
                    ></textarea>
                </div>
            ))}

            {/* Formulaire pour ajouter une nouvelle expérience */}
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Nom complet'
                        value={newExperience.jobTitle}
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={newExperience.companyName}
                        onChange={(e) => handleChange(e, 'companyName')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <label className='input input-bordered flex items-center gap-2 w-full'>
                        <Calendar className='w-4 h-4 opacity-70' />
                        <input
                            type="text"
                            placeholder='Date de début'
                            onFocus={(e) => e.target.type = "date"}
                            onBlur={(e) => {
                                if (!e.target.value) e.target.type = "text"
                            }}
                            value={newExperience.startDate}
                            onChange={(e) => handleChange(e, 'startDate')}
                            className='grow'
                        />
                    </label>
                    <label className='input input-bordered flex items-center gap-2 w-full ml-4'>
                        <Calendar className='w-4 h-4 opacity-70' />
                        <input
                            type="text"
                            placeholder='Date de fin'
                            onFocus={(e) => e.target.type = "date"}
                            onBlur={(e) => {
                                if (!e.target.value) e.target.type = "text"
                            }}
                            value={newExperience.endDate}
                            onChange={(e) => handleChange(e, 'endDate')}
                            className='grow'
                        />
                    </label>
                </div>
                <textarea
                    placeholder='Description'
                    value={newExperience.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full'
                ></textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className='btn btn-primary mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>

        </div>
    )
}

export default ExperienceForm
