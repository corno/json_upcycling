import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"
import * as s_parameters from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_unresolved from "./unresolved.js"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

export namespace declarations {
    
    export type Properties = p_.Refiner_With_Parameter<
        s_target.Properties,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value = p_.Refiner_With_Parameter<
        s_target.Value,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Root = p_.Refiner_With_Parameter<
        s_target.Root,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const Properties: declarations.Properties = (
    $,
    abort,
    $p,
) => r_from_unresolved.Properties(
    r_unresolved_from_list_of_characters.Properties(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Value: declarations.Value = (
    $,
    abort,
    $p,
) => r_from_unresolved.Value(
    r_unresolved_from_list_of_characters.Value(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Root: declarations.Root = (
    $,
    abort,
    $p,
) => r_from_unresolved.Root(
    r_unresolved_from_list_of_characters.Root(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)
