const fs = require("fs");
const path = require("path");

// Define the path to the directory where your files are located
const directoryPath = path.join(__dirname);
// console.log( __dirname )
// Read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  // Filter the list of files to only include files with the ".jsx" extension
  const jsxFiles = files.filter((file) => path.extname(file) === ".jsx");
  console.log(jsxFiles.length);
  // Read the contents of each file
  jsxFiles.forEach((file, i) => {
    // console.log( `import {${ path.basename( file, ".jsx" ) }Template} from './pages/ecomAdmin/${ path.basename( file, '.jsx' ) }'` )
    fs.readFile(path.join(directoryPath, file), "utf-8", (err, contents) => {
      // console.log( i )
      if (err) {
        console.error(`Error reading file ${file}: ${err}`);
        return;
      }

      //   if ( file.includes( "AdminEcomApiKeyListPage" ) ) {
      //   const search = `export default ${ path.basename( file, ".jsx" ) };`
      //   let newData = JSON.stringify( contents )
      //   newData.replace( search, `${ search }\`` )
      //   console.log( newData )
      //   fs.writeFile( path.join( directoryPath, "test" ), newData, "utf-8", err => {
      //     if ( err ) throw err;
      //     console.log( `File ${ file } has been modified and saved.` );
      //   } );

      //   console.log( newData.match( search ) )
      // }
      // "../utils/MkdSDK";
      // "../authContext";
      // "../globalContext";
      //'react-quill';
      // "../utils/utils";
      // "../components/AddButton"
      //  "../components/ExportButton"
      //   "../components/PaginationBar";

      let newData = contents;
      //   newData = newData.replace("../utils/MkdSDK", "Utils/MkdSDK");
      //   newData = newData.replace("../authContext", "Src/authContext");
      //   newData = newData.replace("../globalContext", "Src/globalContext");
      //   newData = newData.replace("../utils/utils", "Utils/utils");
      newData = newData.replace(
        "../../components/AddButton",
        "Components/AddButton"
      );
      newData = newData.replace(
        "../../components/ExportButton",
        "Components/ExportButton"
      );
      newData = newData.replace(
        "../../components/PaginationBar",
        "Components/PaginationBar"
      );
      newData = newData.replace(
        "../components/AddButton",
        "Components/AddButton"
      );
      newData = newData.replace(
        "../components/ExportButton",
        "Components/ExportButton"
      );
      newData = newData.replace(
        "../components/PaginationBar",
        "Components/PaginationBar"
      );
      newData = newData.replace(
        "../../components/DynamicContentType",
        "Components/DynamicContentType"
      );
      newData = newData.replace("../../globalContext", "Src/globalContext");
      newData = newData.replace("../Src/globalContext", "Src/globalContext");
      newData = newData.replace("../Src/authContext", "Src/authContext");
      newData = newData.replace("../../authContext", "Src/authContext");
      newData = newData.replace("../../utils/MkdSDK", "Utils/MkdSDK");
      newData = newData.replace("../../utils/utils", "Utils/utils");
      // save the new content to the same file
      fs.writeFile(path.join(directoryPath, file), newData, "utf-8", (err) => {
        if (err) throw err;
        console.log(`File ${file} has been modified and saved.`);
      });

      console.log(`Contents of file ${file}:`);
    });
  });
});
