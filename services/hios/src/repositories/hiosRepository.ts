import _ from "lodash";
import { CreationModel } from "@hio-hio/interfaces";
import { Hio, HioModel } from "../lib/models/hio";

/**
 * Creates a new hio
 * @param createModel The data needed to create a hio
 * @returns The created hio model
 */
export const create = async (
  createModel: CreationModel<HioModel>
): Promise<HioModel> => Hio.create(createModel, { raw: true });

/**
 * Returns hios by the specified target user id
 * @param targetUserId The user id to search by
 */
export const getByTargetUserId = async (
  targetUserId: string
): Promise<HioModel[]> => Hio.findAll({ where: { targetUserId }, raw: true });
