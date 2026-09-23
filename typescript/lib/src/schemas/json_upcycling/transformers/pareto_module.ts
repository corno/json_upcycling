import * as p_ from 'pareto-core/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

import * as s_source from "../schema.js"
import * as s_target from "pareto/modules/pareto_new/schemas/module/schema"

namespace declarations {

    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Root
    >
}

import * as sh from "pareto/modules/pareto_new/schemas/module/shorthands/target"

//dependencies
import * as t_to_pareto_refiner_unresolved_from_deserialized_json from "./pareto_refiner_from_deserialized_json.js"
// import * as t_to_pareto_refiner_unresolved_from_list_of_characters from "./pareto_refiner_unresolved_from_list_of_characters.js"
// import * as t_to_pareto_refiner_resolved_from_unresolved from "./pareto_refiner_resolved_from_unresolved.js"
// import * as t_to_pareto_refiner_resolved_from_list_of_characters from "./pareto_refiner_resolved_from_list_of_characters.js"
import * as t_to_pareto_schema from "./pareto_schema.js"
// import * as t_to_pareto_transformer_resolved_to_astn_sealed_target from "./pareto_transformer_resolved_to_astn_sealed_target.js"
// import * as t_to_pareto_transformer_resolved_to_serialized_paragraph from "./pareto_transformer_resolved_to_serialized_paragraph.js"

export const Root: declarations.Root = ($) => sh.module(
    p_.literal.dictionary({}),
    p_.literal.dictionary({
        "foo": sh.schema_package(
            t_to_pareto_schema.Root(
                $,
            ),
            p_.literal.dictionary({
                // "astn sealed target": t_to_pareto_transformer_resolved_to_astn_sealed_target.Schema($),
                // "serialized paragraph": t_to_pareto_transformer_resolved_to_serialized_paragraph.Schema($),
            }),
            p_.literal.dictionary({}),
            p_.literal.dictionary({
                "deserialized json": t_to_pareto_refiner_unresolved_from_deserialized_json.Schema($),
                // "list of characters": t_to_pareto_refiner_resolved_from_list_of_characters.Schema($),
            }),
            p_.literal.dictionary({})
        ),
    }),
    p_.literal.dictionary({}),
    p_.literal.dictionary({}),
    p_.literal.dictionary({}),
    p_.literal.dictionary({}),
)