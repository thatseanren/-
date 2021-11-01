import React from 'react'
import Header from '../../../header'
import { useRouter } from "next/router"
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link';
export default function Page(props) {
    const router = useRouter()
    const { name, set } = router.query

    return (
        <React.Fragment>
            <Header />
            {(name, set)}
            <Breadcrumbs>
                <Link color="inherit" href="/" >

                </Link>
                <Link color="inherit" href="/getting-started/installation/">
                    Core
  </Link>
            </Breadcrumbs>

        </React.Fragment>
    );
}
