FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["AmirKouretchianWeb.csproj", "./"]
RUN dotnet restore "AmirKouretchianWeb.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AmirKouretchianWeb.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AmirKouretchianWeb.csproj" -c Release -o /app/publish

FROM node:14.15.5-alpine AS spas
WORKDIR /src
COPY package.json .
COPY webpack.config.js .
COPY Spa/ Spa/
RUN npm install
RUN npm run prod

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=spas /src/wwwroot/js/bundle.js wwwroot/js/
ENTRYPOINT ["dotnet", "AmirKouretchianWeb.dll"]
