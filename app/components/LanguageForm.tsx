import { Language } from '@/type';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    languages: Language[];
    setLanguages: (languages: Language[]) => void;
}

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {

    const [newLanguage, setNewLanguage] = useState<Language>(
        {
            language: '',
            proficiency: ''
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Language) => {
        setNewLanguage({ ...newLanguage, [fied]: e.target.value })
    }

    const handleExistingChange = (index: number, field: keyof Language, value: string) => {
        const updatedLanguages = [...languages]
        updatedLanguages[index] = { ...updatedLanguages[index], [field]: value }
        setLanguages(updatedLanguages)
    }

    const handleAddLanguage = () => {
        setLanguages([...languages, newLanguage])
        setNewLanguage(
            {
                language: '',
                proficiency: ''
            }
        )
    }

    const handleDeleteLanguage = (index: number) => {
        const updatedLanguages = languages.filter((_, i) => i !== index)
        setLanguages(updatedLanguages)
    }

    return (
        <div className='space-y-4'>
            {/* Afficher les langues existantes */}
            {languages.map((lang, index) => (
                <div key={index} className='p-4 border border-primary rounded-lg space-y-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-semibold text-primary'>Langue {index + 1}</span>
                        <button
                            onClick={() => handleDeleteLanguage(index)}
                            className='btn btn-error btn-xs'
                        >
                            <Trash2 className='w-3' />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Langue"
                        value={lang.language}
                        onChange={(e) => handleExistingChange(index, 'language', e.target.value)}
                        className='input input-bordered w-full'
                    />
                    <select
                        value={lang.proficiency}
                        onChange={(e) => handleExistingChange(index, 'proficiency', e.target.value)}
                        className='select select-bordered w-full'
                    >
                        <option value="">Sélectionner la maîtrise</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                    </select>
                </div>
            ))}

            {/* Formulaire pour ajouter une nouvelle langue */}
            <input
                type="text"
                placeholder="Langue"
                value={newLanguage.language}
                onChange={(e) => handleChange(e, 'language')}
                className='input input-bordered w-full'
            />
            <select
                value={newLanguage.proficiency}
                onChange={(e) => handleChange(e, 'proficiency')}
                className='select select-bordered w-full'
            >

                <option value="">Sélectionner la maîtrise</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>

            </select>

            <button
                onClick={handleAddLanguage}
                className='btn btn-primary mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default LanguageForm
