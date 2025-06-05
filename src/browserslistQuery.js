import packageJson from "../package.json" with { type: "json" };

const browserslistQuery = packageJson.browserslist;

export default browserslistQuery;
