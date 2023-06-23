import { FC, useContext, useEffect, useState } from "react";
import { useQuery, gql } from '@apollo/client';

import './styles.css'
import { Specializations } from "@/common/constants/common.constants";
import { IFilters, ILanguage } from "@/common/components/models/applicants.model";
import { ISkills } from "@/common/components/models/applicants.model";
import { FilterContext, IFilterContext } from "@/common/providers/Filter.provider";

const LANGUAGES_QUERY = gql`
    query languages {
        getAllLanguages {
            languageName
          }
    } 
`

const SKILLS_QUERY = gql`
    query skills {
        getAllSkills {
            skillName
            skillType
        }
    }
`

export const Filter: FC = () => {

    const { data: languages } = useQuery<Record<'getAllLanguages', ILanguage[]>>(LANGUAGES_QUERY)
    const { data: skills } = useQuery<Record<'getAllSkills', ISkills[]>>(SKILLS_QUERY)
    const { input, setInput } = useContext(FilterContext) as IFilterContext;

    const generateOptions = (n: number) => {
        const options = [];
        for (let i = 0; i < n; i++) {
            options.push(<option key={i}
                value={i + 1}>{i + 1}</option>);
        }
        return options;
    }

    const onFilter = (value: Partial<Record<keyof IFilters, string | number>>) => {
        setInput({...input, ...value} as any)
    }

    return <div className="filter">
        <div className="flex items-center justify-between mb-2">
            <div className="filter-title text-base">Filter</div>
            {Object.values(input).some(value => value) ?
             <button onClick={() => setInput({skillType: 0, experience: 0, language: 0, skillName: 0})}
             className="text-sm text-amber-600">Clear filters</button> : null}
        </div>
        <div className="flex flex-col gap-4">
            <select defaultValue={0} value={input.skillType}
                onChange={(e) => onFilter({ skillType: e.target.value })}
                className="w-full outline-none select-bordered select select-sm max-w-xs capitalize"
            >
                <option value={0} disabled>Specialization</option>
                <option className="capitalize" value={Specializations.FRONTEND}>frontend</option>
                <option className="capitalize" value={Specializations.BACKEND}>backend</option>
            </select>
            <select defaultValue={0} value={input.skillName}
                onChange={(e) => onFilter({ skillName: e.target.value })}
                className="w-full outline-none select-bordered select select-sm max-w-xs"
            >
                <option value={0} disabled>Languages</option>
                {skills?.getAllSkills?.map((lang, index) => <option value={lang.skillName} key={index}>{lang.skillName}</option>)}
            </select>
            <select defaultValue={0} value={input.experience}
                onChange={(e) => onFilter({ experience: +e.target.value })}
                className="w-full outline-none select-bordered select select-sm max-w-xs"
            >
                <option value={0} disabled >Experience</option>
                {generateOptions(15)}
            </select>
            <select defaultValue={0} value={input.language} 
                onChange={(e) => onFilter({ language: e.target.value })}
                className="w-full outline-none select-bordered select select-sm max-w-xs"
            >
                <option value={0} disabled>Foreign languages</option>
                {languages?.getAllLanguages?.map(lang => <option value={lang.languageName} key={lang.languageName}>{lang.languageName}</option>)}
            </select>
        </div>
    </div>
}