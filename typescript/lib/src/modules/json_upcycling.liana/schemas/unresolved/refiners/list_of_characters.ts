import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"
import * as s_parameters from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_parse_tree_from_list_of_characters from "astn-core/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

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
) => r_from_parse_tree.Properties(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Value: declarations.Value = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Root: declarations.Root = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Root(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)
