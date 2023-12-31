import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
const LayoutWrapper = ({ children }) => {
    return (
        <div>
            <SectionContainer>
                <div className="relative flex flex-col justify-between">
                    <header className="fixed z-10 flex w-full items-center justify-between bg-gradient px-4 xl:px-0">
                        <div>
                            <Link href="/" aria-label={siteMetadata.headerTitle}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        {' '}
                                        <Image
                                            src="/static/images/avatar.png"
                                            alt="Logo"
                                            height={90}
                                            width={90}
                                        />{' '}
                                    </div>

                                    {typeof siteMetadata.headerTitle === 'string' ? (
                                        <div className="text-2xl">
                                            <h1 className="hidden font-semibold sm:block sm:drop-shadow-md sm:text-gray-100 font-Montserrat">
                                                {siteMetadata.headerTitle}
                                            </h1>
                                            <h3 className="hidden font-light sm:block sm:drop-shadow-md sm:text-gray-100 font-Montserrat">
                                                {siteMetadata.sologan}
                                            </h3>
                                        </div>
                                    ) : (
                                        siteMetadata.headerTitle
                                    )}
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center justify-between text-base leading-5">
                            <div className="sm:block lg:flex lg:items-center">
                                {headerNavLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="font-Bold hidden p-1 text-xl font-Montserrat font-bold drop-shadow-md xl:text-gray-100 sm:p-4 lg:block"
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                            {/* <ThemeSwitch /> */}
                            <MobileNav />
                        </div>
                    </header>
                    <main className="z-0 mb-auto mt-20">{children}</main>
                </div>
            </SectionContainer>
        </div>
    )
}

export default LayoutWrapper
