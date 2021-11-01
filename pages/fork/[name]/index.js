import React from 'react'
import Header from '../../header'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link';
import { useRouter } from "next/router"

export default function ForkPage(props) {
    const router = useRouter()
    const { name } = router.query

    return (
        <React.Fragment>
            <Header />
            {name}
            <Breadcrumbs>
                <Link color="inherit" href="/" >

                </Link>
                <Link color="inherit" href="/getting-started/installation/">
                    Core
                </Link>
            </Breadcrumbs>

        </React.Fragment>
    )
}

