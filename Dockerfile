FROM node:18.17 AS build
ENV NODE_ENV=development APP_ENV=development NITRO_HOST=${NUXT_HOST:-0.0.0.0} NITRO_PORT=${NUXT_PORT:-3000} NUXT_TELEMETRY_DISABLED=1
# ENV PATH /frontend/node_modules/.bin:$PATH
COPY . /frontend
WORKDIR /frontend
RUN yarn install --frozen-lockfile --network-timeout 100000 --non-interactive
RUN yarn build --standalone
EXPOSE ${NUXT_PORT}

FROM build AS run-dev
# ENTRYPOINT ["yarn"]
CMD ["yarn", "dev"]

FROM build AS run-start
ENV NODE_ENV=production APP_ENV=production
ENTRYPOINT ["yarn"]
CMD ["start"]

FROM node:18.17-alpine AS run-minimal
ARG NUXT_VERSION=^3.5.0
ARG NUXT_CONTENT_VERSION=^2.4.3
ARG TAILWINDCSS_VERSION=^3.2.1
ARG AUTOPREFIXER_VERSION=^10.4.13
ARG POSTCSS_VERSION=^8.4.18
ARG ASPECT_RATIO_VERSION=^0.4.2
ARG FORMS_VERSION=^0.5.3
ARG TYPOGRAPHY_VERSION=^0.5.7
ARG HEADLESSUI_VERSION=^1.7.3
ARG HEROICONS_VERSION=^2.0.12
ARG PINIA_VERSION=^0.4.3
ARG PINIA_PERSISTED_VERSION=^1.0.0
ARG VEE_VERSION=^4.7.3
ARG VEE_INT_VERSION=^4.7.3
ARG VEE_RULES_VERSION=^4.7.3
ARG QR_CODE_VERSION=^3.3.3
ARG I18N_VERSION=^8.0.0-beta.13
ARG NUXT_ROBOTS_VERSION=^3.0.0
ARG VITE_PWA_NUXT_VERSION=^0.1.0
ENV NODE_ENV=production APP_ENV=production NITRO_HOST=${NUXT_HOST:-0.0.0.0} NITRO_PORT=${NUXT_PORT:-3000} NUXT_TELEMETRY_DISABLED=1
WORKDIR /frontend
RUN yarn add nuxt@${NUXT_VERSION} @nuxt/content@${NUXT_CONTENT_VERSION} tailwindcss@${TAILWINDCSS_VERSION} autoprefixer@${AUTOPREFIXER_VERSION} postcss@${POSTCSS_VERSION} @tailwindcss/aspect-ratio@${ASPECT_RATIO_VERSION} @tailwindcss/forms@${FORMS_VERSION} @tailwindcss/typography@${TYPOGRAPHY_VERSION} @headlessui/vue@${HEADLESSUI_VERSION} @heroicons/vue@${HEROICONS_VERSION} @pinia/nuxt@${PINIA_VERSION} @pinia-plugin-persistedstate/nuxt${PINIA_PERSISTED_VERSION} vee-validate@${VEE_VERSION} @vee-validate/i18n${VEE_INT_VERSION} @vee-validate/rules${VEE_RULES_VERSION} qrcode.vue${QR_CODE_VERSION} @nuxtjs/i18n${I18N_VERSION} @nuxtjs/robots${NUXT_ROBOTS_VERSION} @vite-pwa/nuxt${VITE_PWA_NUXT_VERSION}
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/api ./api
COPY --from=build /app/assets ./assets
COPY --from=build /app/components ./components
COPY --from=build /app/config ./config
COPY --from=build /app/content ./content
COPY --from=build /app/interfaces ./interfaces
COPY --from=build /app/layouts ./layouts
COPY --from=build /app/locales ./locales
COPY --from=build /app/middleware ./middleware
COPY --from=build /app/pages ./pages
COPY --from=build /app/plugins ./plugins
COPY --from=build /app/public ./public
COPY --from=build /app/static ./static
COPY --from=build /app/stores ./stores
COPY --from=build /app/utilities ./utilities
COPY --from=build /app/.env ./
COPY --from=build /app/app.vue ./
COPY --from=build /app/nuxt.config* ./
COPY --from=build /app/tailwind.config* ./
COPY --from=build /app/tsconfig.json ./
ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
