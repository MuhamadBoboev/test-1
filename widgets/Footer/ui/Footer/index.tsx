import classes from './footer.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { FooterTop } from '@widgets/Footer/ui/FooterTop'
import Link from 'next/link'

function Footer() {
  return (
    <footer className={classes.footer}>
      <Wrapper className={classes.wrapper}>
        <FooterTop />
        <div className={classes.bottom}>
          <p className={classes.year}>2021 Relume. All right reserved.</p>
          {/* <Link
            className={classes.developer}
            href="https://bobo.tj?utm_source=promebel"
            target="_blank"
          >
            Created by BO/<span>BO</span>
          </Link> */}
          <div className={classes.rightInfo}>
            <p>Created by <span className={classes.color}>BO/BO</span></p>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}

export { Footer }
