import * as count from "./Count";
import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";

export const CidadeProviders = {
  ...create,
  ...deleteById,
  ...updateById,
  ...getById,
  ...count,
};
