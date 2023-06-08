'use client'
import { ArrowRight } from "@/common/icons/ArrowRight"
import { AdminCvActions } from "../admin-cv-actions/AdminCvActions"
import { ActionButtonWrapper, AdminStatusActions } from "../admin-status-actions/AdminStatusActions"

import './styles.css';
import { usePathname, useRouter } from "next/navigation";

export const ApplicantDetails = () => {

    const mock_id = '1';
    const path = usePathname();
    const router = useRouter();
    
    return <div className="flex flex-col gap-6 applicant-details">
        <div className="flex">
            <div>
                <img src={'/Avatar-Image.png'}
                    width={205}
                    height={205}
                    className='rounded' alt='person'></img>
            </div>
            <div className="right-actions flex flex-col flex-grow items-end justify-center gap-2 pr-6">
                <AdminStatusActions />
                <AdminCvActions />
                <ActionButtonWrapper
                    onCLick={() => router.push(`${path}/${mock_id}`)}
                    label={'Edit account'}
                    icon={<ArrowRight></ArrowRight>} />
            </div>
        </div>
        <div className="flex gap-2">
            <div className="w-2/3">
                <div className="mb-14">
                    <div className="applicant-name">Darlene Robertson</div>
                    <div>Specialization</div>
                </div>
                <div>
                    <div className="sub-title">Description:</div>

                    <div className="section">About</div>
                    <div className="sub-title-1 mb-6">Degree: B.C Tech(Hons: )</div>
                    <div className="mb-6">
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                    </div>
                    <div className="sub-title-1">Experience in Singapore Semiconductor Industry:</div>
                    <div className="mb-6">6 + years</div>
                    <div className="sub-title-1">Domain Knowledge:</div>
                    <div className="mb-6">
                        Mixed Signal Logic Products(MSLP):
                        * Final Test
                        * Wafer Sort
                        * Assembly
                    </div>
                    <div className="sub-title-1">Experience in Software Development:</div>
                    <div className="mb-6">8 + years</div>

                    <div className="section mb-6">Background Details</div>

                    <div className="sub-title-1">Position:</div>
                    <div>My latest position is Software Engineer in UTAC(Singapore).</div>

                    <div className="sub-title-1">Microsoft Certificates:</div>
                    <div className="mb-6">
                        <div>- Microsoft Certified Technology Specialist(MCTS)</div>
                        <div >- Microsoft Certified Professional Developer(MCPD) for .Net Framework 2.0, 3.5, 4.0 +</div>
                    </div>
                    
                    <div className="sub-title-1">Experience in Semiconductor Industry:</div>
                    <div className="mb-6">6 + years Experience in Semiconductor Industry with MSLP Domain knowledge.</div>
                    
                    <div className="sub-title-1">Experience in Software Development:</div>
                    <div className="mb-6">8 + years experience in Software development with full SDLC(Waterfall model, Agile).</div>
                    
                    <div className="sub-title-1">Skills:</div>
                    <div className="mb-6">
                        <div>- Multi tiers architecture,</div>
                        <div>- CAB Framework,</div>
                        <div>- ASP.Net</div>
                        <div>- C#.NET, VB.Net,</div>
                        <div>- HTML, CSS, XML, JavaScript, Crystal Report, AJAX, LINQ, Active Reports.</div>
                    </div>

                    <div className="sub-title-1">Others:</div>
                    <div className="mb-6">
                        Excellent communication skills and time management skills.
                        I’m Enthusiastic, self - motivated and * very fast learner *.
                        Able to work under pressure and tide schedules, plus highly responsible.
                    </div>

                    Best Regards <br/>
                    PM
                </div>
            </div>
            <div className="w-1/3">
                <div className="sub-title">
                    Nationality:
                </div>
                <div className="mb-6">Canada</div>
                <div className="sub-title">
                    Visa:
                </div>
                <div className="mb-6">F4</div>
                <div className="sub-title">
                    Email:
                </div>
                <div className="mb-6">main@mail.com</div>
                <div className="sub-title">
                    In favorites:
                </div>
                <div>1) Company A</div>
                <div>2) Comapny B</div>
            </div>
        </div>
    </div>
}







