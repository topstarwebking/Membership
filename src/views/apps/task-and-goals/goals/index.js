
import React, { Fragment, useEffect, useState } from 'react';
import MymemberGoals from './mymemberGoal/mymember';
import PersonalGoals from './personalGoals/persoanl';
import SubMymemberlisting from './subGoals/SubMymemberlisting';
import SubPersonallisting from './subGoals/SubPersonallisting';
import GoalTabFilter from './goalTabsFilter'
import { useParams } from 'react-router-dom';
import GoalSetting from './setting';

const GoalsMain = () => {
    const [viewSubGoals, setViewSubGoals] = useState(null)
    const {
        otherFilter } = useParams()
    useEffect(() => {
        setViewSubGoals(null)
    }, [otherFilter])
    return (
        <div>
            <GoalTabFilter />
            {viewSubGoals === null ? <Fragment>
                {/* these are the primary goals card */}
                {otherFilter === 'Mymember' && <MymemberGoals viewSubGoals={viewSubGoals} setViewSubGoals={setViewSubGoals} />}
                {otherFilter === 'Personal' && <PersonalGoals viewSubGoals={viewSubGoals} setViewSubGoals={setViewSubGoals} />}
                {otherFilter === 'Setting' && <GoalSetting />}

            </Fragment> :
                <Fragment>
                    {/* these are the primary goals card */}

                    {otherFilter === 'Mymember' && <SubMymemberlisting viewSubGoals={viewSubGoals} setViewSubGoals={setViewSubGoals} />}
                    {otherFilter === 'Personal' && <SubPersonallisting viewSubGoals={viewSubGoals} setViewSubGoals={setViewSubGoals} />}
                </Fragment>
            }

        </div>
    )
}

export default GoalsMain;
