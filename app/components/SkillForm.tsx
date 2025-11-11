import { Skill } from '@/type';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {

  const [newSkill, setNewSkill] = useState<Skill>(
    {
      name: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Skill) => {
    setNewSkill({ ...newSkill, [fied]: e.target.value })
  }

  const handleExistingChange = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = { ...updatedSkills[index], [field]: value }
    setSkills(updatedSkills)
  }

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: '' });
  }

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    setSkills(updatedSkills)
  }

  return (
    <div>
      {/* Afficher les compétences existantes */}
      {skills.map((skill, index) => (
        <div key={index} className='flex items-center gap-2 mb-4 p-3 border border-primary rounded-lg'>
          <input
            type="text"
            placeholder="compétence"
            value={skill.name}
            onChange={(e) => handleExistingChange(index, 'name', e.target.value)}
            className='input input-bordered input-sm w-full'
          />
          <button
            onClick={() => handleDeleteSkill(index)}
            className='btn btn-error btn-xs'
          >
            <Trash2 className='w-3' />
          </button>
        </div>
      ))}

      {/* Formulaire pour ajouter une nouvelle compétence */}
      <div className='mt-4'>
        <input
          type="text"
          placeholder="compétence"
          value={newSkill.name}
          onChange={(e) => handleChange(e, 'name')}
          className='input input-bordered w-full'
        />
      </div>

      <button
        onClick={handleAddSkill}
        className='btn btn-primary mt-4'
      >
        Ajouter
        <Plus className='w-4' />
      </button>
    </div>
  )
}

export default SkillForm
