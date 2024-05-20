import classes from './specialist.module.scss'
import { ISpecialist } from '@modules/specialists/model/ISpecialist'
import { SpecialistInfo } from '../SpecialistInfo'
import { Wrapper } from '@shared/ui/Wrapper'
import { SpecialistImages } from '../SpecialistImages'

interface Props {
  specialist: ISpecialist
}

function Specialist({specialist}: Props) {
  const {name, images} = specialist
  return (
    <Wrapper className={classes.wrapper}>
      <div className={classes.specialist}>
        <SpecialistInfo {...specialist}/>
        <SpecialistImages
          specialistName={name}
          images={images}
        />
      </div>
    </Wrapper>
  )
}

export { Specialist }