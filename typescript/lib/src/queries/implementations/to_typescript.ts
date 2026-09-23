import * as p_ from 'pareto-core/query'

//interface dependencies
import type * as query_interfaces_file_in_directory_out from "pareto-common/modules/file_in_directory_out/queries/interfaces"

//data  types
import type * as s_serialize_prose from "pareto/modules/typescript_light/schemas/serialization/schema"
import type * as s_file_in_directory_out_query from "pareto-common/modules/file_in_directory_out/schemas/query/schema"

//dependencies
import * as t_liana_to_typescript_directory_content from "../../schemas/json_upcycling/transformers/typescript_directory_content.js"
import * as r_liana_from_list_of_characters from "../../modules/json_upcycling.liana/schemas/unresolved/refiners/list_of_characters.js"
import * as ser_deserialization_to_paragraph from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/serializers"

//shorhands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/target"

export const $$: p_.Query_Implementation<
    query_interfaces_file_in_directory_out.operation,
    {
        'serialization parameters': s_serialize_prose.Source_File_Parameters,
    },
    null
> = p_.query(
    (e, $s, $q) => e.refine(
        ($, abort): s_file_in_directory_out_query.Result => ({
            'data': t_liana_to_typescript_directory_content.Root(
                r_liana_from_list_of_characters.Root(
                    $.data,
                    ($) => abort({
                        'message': sh.ph.text(ser_deserialization_to_paragraph.Error($)),
                    }),
                    {
                        'tab size': 4
                    }
                ),
                {
                    'file write parameters': {
                        'newline': "\n",
                    },
                    'serialization parameters': $s['serialization parameters'],
                }
            )
        })
    )
)
