import _ from "lodash";
import { CreationModel } from "@gw-workshop/interfaces";
import { Hio, HioModel } from "../lib/models/hio";

/**
 * Creates a new hio
 * @param createModel The data needed to create a hio
 * @returns The created hio model
 */
export const create = async (
  createModel: CreationModel<HioModel>
): Promise<HioModel> => Hio.create(createModel, { raw: true });
