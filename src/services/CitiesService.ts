// import { Prisma } from "@prisma/client";
// import { prismaDatabase } from "../utils/prisma";
// import { mapKeys } from "lodash";
// import { validatorObject } from "../utils/yup/location.validation";

// export class CitiesService {
//   static async ListOfAllCities(): Promise<Prisma.citiesSelect[]> {

//     // await validatorObject({},{ id })
    
//     const cities = await prismaDatabase.$queryRaw<Prisma.citiesSelect[]>`CALL PROCEDURE_BUSCAR_CITIES()`;
//     const objCities = cities.map((objeto: any) =>
//       mapKeys(objeto, (valor, chave) => {
//         switch (chave) {
//           case "f0":
//             return "id";
//           case "f1":
//             return "name";
//           case "f2":
//             return "state_id";
//           case "f3":
//             return "created_at";
//           case "f4":
//             return "updated_at";
//           default:
//             return chave;
//         }
//       })
//     );    
//     // await prismaDatabase.$disconnect();
//     return objCities;
//   }
// }
