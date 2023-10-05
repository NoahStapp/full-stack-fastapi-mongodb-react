import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div>
            <div className="mt-10">
              <div>
                <div className="inline-flex space-x-4">
                  <Link
                    href="/about"
                    className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-500"
                  >
                    Key features
                  </Link>
                  <a href="github.href" className="inline-flex space-x-4">
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-rose-500">
                      <span className="inline-flex items-center space-x-1 text-sm font-medium text-rose-400">
                        {/* <component :is="github.icon" className="h-5 w-5" aria-hidden="true" /> */}
                      </span>
                      <span>Source repository</span>
                      {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                  </a>
                </div>
              </div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  FastAPI/Nuxt starter stack
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  Accelerate your next web development project with this FastAPI
                  0.88 / Nuxt.js 3.0 base project generator.
                </p>
              </div>
              <div className="mt-6 sm:max-w-xl">
                <ul className="list-disc ml-6 text-gray-600">
                  <li>
                    <span className="font-bold">Authentication</span> user
                    management schemas, models, crud and apis, with OAuth2 JWT
                    token `access` and `refresh` support & default hashing.
                  </li>
                  <li>
                    <span className="font-bold">Authorisation</span> via
                    middleware for page access, including logged in or
                    superuser.
                  </li>
                  <li>
                    <span className="font-bold">Databases</span> for Neo4j and
                    PostgreSQL included, plus PGAdmin for PostgreSQL management,
                    using SQLAlchemy 1.4.
                  </li>
                  <li>
                    <span className="font-bold">Form validation</span> with
                    Vee-Validate 4.
                  </li>
                  <li>
                    <span className="font-bold">State management</span> with
                    Pinia, and persistance with Pinia PersistedState.
                  </li>
                  <li>
                    <span className="font-bold">CSS and templates</span> with
                    TailwindCSS, HeroIcons, and HeadlessUI.
                  </li>
                  <li>
                    <span className="font-bold">Content management</span> with
                    Nuxt Content for writing Markdown pages.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="392"
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div>
            <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
              <img
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src="https://images.unsplash.com/photo-1465661668481-15b9405ca28e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&flip=h&w=1074&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
