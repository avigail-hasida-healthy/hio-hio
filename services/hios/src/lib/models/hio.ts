import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class Hio extends Model<
  InferAttributes<Hio>,
  InferCreationAttributes<Hio>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare targetUserId: string;
  declare createdAt: CreationOptional<Date>;
}

export interface HioModel extends InferAttributes<Hio> {}

export const init = (sequelize: Sequelize) => {
  Hio.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      targetUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
    },
    { sequelize, modelName: "Hio" }
  );
};
